package data

import (
	"fmt"

	_ "github.com/mattn/go-sqlite3"
	"xorm.io/xorm"
)

type User struct {
	Id       string `xorm:"pk"`
	Name     string
	Email    string
	Password string `json:"-"`
	Admin    int8
}

type Lesson struct {
	Id      string `xorm:"pk"`
	Subject string
	Title   string
	Content string
}

func CreateDBEngine() (*xorm.Engine, error) {
	engine, err := xorm.NewEngine("sqlite3", "./platforma")
	if err != nil {
		return nil, err
	}

	// Test the connection
	if err := engine.Ping(); err != nil {
		return nil, err
	}

	fmt.Println("Connected to SQLite!")
	return engine, nil
}
