import { Lesson, Question, QuickQuestion, Test, UserLeaderboard } from "../props/Props.tsx"

// Function to save JWT token to a cookie
export function setCookie(name: string, value: string, expirationInMinutes: number = 300) {
    const expires = new Date(Date.now() + expirationInMinutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; SameSite=None; secure; expires=${expires}; path=/`;
}

// Function to get JWT token from cookies
export function getCookie(name: string) {
    const matches = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return matches ? matches[2] : null;
}

// Delete a cookie
export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Delete a cookie
export function deleteAllCookies() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}


// Function to make API call
export async function apiCall(url: string, method: string, data: any) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status == 400) {
        return {status: 400};
    }
    return response.json();
}

export async function fetchUser(id: any) {
    const response = await fetch("http://127.0.0.1:8000/public/getUser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    });
    return response.json();
}

export async function fetchAllLessons(): Promise<Lesson[]> {
    const response = await fetch("http://127.0.0.1:8000/public/lessons", {
        method: "GET",
    });
    return response.json();
}

export async function fetchLessonDetails(id: string)  {
    const response = await fetch("http://127.0.0.1:8000/public/getLesson", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    });
    return response.json();
}

export async function fetchQuickQuestions(id: string): Promise<QuickQuestion[]> {
    const response = await fetch(`http://127.0.0.1:8000/public/getQuickQuiz/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.json();
}

export async function fetchAllTests(): Promise<Test[]> {
    const response = await fetch(`http://127.0.0.1:8000/public/getTests`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.json();
}

export async function fetchTest(id: string): Promise<Test> {
    const response = await fetch(`http://127.0.0.1:8000/public/getTest/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    return response.json();
}

export async function fetchTestQuestions(id: string): Promise<Question[]> {
    const response = await fetch(`http://127.0.0.1:8000/public/getQuestions/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    return response.json();
}

export async function fetchUpdateGold(email: string, gold: number) {
    const response = await fetch(`http://127.0.0.1:8000/public/updateGold`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            email: email,
            gold: gold,
        })
    })

    return response.json();        
}

export async function fetchUpdateExperience(email: string, experience: number) {
    const response = await fetch(`http://127.0.0.1:8000/public/updateExperience`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            email: email,
            experience: experience,
        })
    })

    return response.json();        
}

export async function fetchLeaderboard(): Promise<UserLeaderboard[]> {
    const response = await fetch(`http://127.0.0.1:8000/public/leaderboard`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    return response.json();
}
