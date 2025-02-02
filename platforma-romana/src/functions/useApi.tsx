import { Lesson } from "../props/Props.tsx"

// Function to save JWT token to a cookie
export function setCookie(name: string, value: string) {
    const expires = new Date(Date.now() + 300 * 60 * 1000).toUTCString();
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

export async function fetchUser(id: any, token: any) {
    const response = await fetch("http://127.0.0.1:8000/private/getUser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
