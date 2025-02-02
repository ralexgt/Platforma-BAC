package main

import (
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v3"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"github.com/ralexgt/server-platforma-ro/data"
	"golang.org/x/crypto/bcrypt"
)

type SignupRequest struct {
	Name     string
	Email    string
	Password string
}

type LoginRequest struct {
	Email    string
	Password string
}

type GetUserRequest struct {
	Id string
}

type PostLessonRequest struct {
	Title   string
	Content string
	Subject string
}

type GetLessonRequest struct {
	Id string
}

func main() {
	// Initialize a new Fiber app
	app := fiber.New()

	// Allow CORS
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Allow requests only from your frontend's URL
		AllowMethods: "GET,POST,DELETE,HEAD,OPTIONS",
	}))

	engine, err := data.CreateDBEngine()
	if err != nil {
		panic(err)
	}
	defer engine.Close()

	// PRIVATE APIS -----------------------------------------------
	private := app.Group("/private")
	private.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte("secret"),
	}))
	private.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"succes": true, "path": "private"})
	})

	private.Post("/getUser", func(c *fiber.Ctx) error {
		log.Println("Request received at private/getUser")
		req := new(GetUserRequest)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		if req.Id == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		user := new(data.User)
		has, _ := engine.Where("id = ?", req.Id).Desc("id").Get(user)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}
		if !has {
			return c.JSON(fiber.Map{"error": "Id-ul nu exista in baza de date"})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"email": user.Email, "name": user.Name, "admin": user.Admin})
	})

	private.Post("/newLesson", func(c *fiber.Ctx) error {
		log.Println("Request received at /private/newLesson")
		req := new(PostLessonRequest)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		if req.Title == "" || req.Content == "" || req.Subject == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Toate câmpurile sunt necesare"})
		}

		lesson := new(data.Lesson)

		var id string
		switch req.Subject {
		case "Subiect 1":
			id = strings.Replace(req.Title, " ", "-", -1) + "-sub1"
		case "Subiect 2":
			id = strings.Replace(req.Title, " ", "-", -2) + "-sub2"
		case "Subiect 3":
			id = strings.Replace(req.Title, " ", "-", -3) + "-sub3"
		}

		has, _ := engine.Where("id = ?", id).Desc("id").Get(lesson)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}
		if has {
			return c.JSON(fiber.Map{"error": "Lectia exista deja in baza de date."})
		}

		// save data in database
		lesson = &data.Lesson{
			Id:      id,
			Title:   req.Title,
			Subject: req.Subject,
			Content: req.Content,
		}

		_, err = engine.Insert(lesson)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		return c.JSON(fiber.Map{"status": "added"})
	})

	// PRIVATE APIS END -----------------------------------------------

	// PUBLIC APIS -----------------------------------------------
	public := app.Group("/public")
	public.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"succes": true, "path": "public"})
	})

	public.Delete("/delete/:id", func(c *fiber.Ctx) error {
		log.Println("Request received at public/delete")
		id := c.Params("id")

		// Delete user by ID
		_, err := engine.ID(id).Delete(&data.Lesson{})
		if err != nil {
			fmt.Println(err)
			return c.Status(500).SendString("Failed to delete lesson")
		}

		return c.SendString("Lesson deleted successfully")

	})

	public.Post("/getLesson", func(c *fiber.Ctx) error {
		log.Println("Request received at public/getLesson")
		req := new(GetLessonRequest)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		if req.Id == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		lesson := new(data.Lesson)
		has, _ := engine.Where("id = ?", req.Id).Desc("id").Get(lesson)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}
		if !has {
			return c.JSON(fiber.Map{"error": "Lectia nu exista in baza de date"})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"title": lesson.Title, "content": lesson.Content, "subject": lesson.Subject})
	})

	public.Get("/lessons", func(c *fiber.Ctx) error {
		log.Println("Request received at /public/lessons")

		var lessons []data.Lesson

		err := engine.Find(&lessons)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		return c.JSON(lessons)
	})

	public.Post("/signup", func(c *fiber.Ctx) error {
		log.Println("Request received at /public/signup")
		req := new(SignupRequest)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		if req.Name == "" || req.Email == "" || req.Password == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Toate câmpurile sunt necesare"})
		}

		user_ := new(data.User)

		has, err := engine.Where("email = ?", req.Email).Desc("id").Get(user_)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}
		if has {
			return c.JSON(fiber.Map{"error": "Email-ul a fost deja folosit"})
		}

		// save data in database
		hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		uuid := GenerateUUIDv5(req.Name, req.Email)

		user := &data.User{
			Id:       uuid.String(),
			Name:     req.Name,
			Email:    req.Email,
			Password: string(hash),
			Admin:    0,
		}

		_, err = engine.Insert(user)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		token, exp, err := createJWTToken(*user)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		return c.JSON(fiber.Map{"token": token, "exp": exp, "user": user})
	})

	public.Post("/login", func(c *fiber.Ctx) error {
		log.Println("Request received on /public/login")
		req := new(LoginRequest)
		if err := c.BodyParser(req); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		if req.Email == "" || req.Password == "" {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		user := new(data.User)
		has, err := engine.Where("email = ?", req.Email).Desc("id").Get(user)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}
		if !has {
			return c.JSON(fiber.Map{"error": "Email-ul sau parola este greșită"})
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		token, exp, err := createJWTToken(*user)

		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err})
		}

		return c.Status(fiber.StatusOK).JSON(fiber.Map{"token": token, "exp": exp, "user": user})
	})
	// PUBLIC APIS END -----------------------------------------------

	// Start the server on port 8000
	log.Fatal(app.Listen("127.0.0.1:8000"))
}

func createJWTToken(user data.User) (string, int64, error) {
	exp := time.Now().Add(time.Minute * 300).Unix()
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.Id
	claims["exp"] = exp
	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", 0, err
	}
	return t, exp, nil
}

func GenerateUUIDv5(name, email string) uuid.UUID {
	combined := strings.ToLower(name + "|" + email)
	namespace := uuid.NameSpaceDNS
	return uuid.NewSHA1(namespace, []byte(combined))
}
