const API="/api/auth"

export const registerUser = async (userData) =>{
    const res = await fetch(`${API}/register`,{
        method:"post",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    })

    return res.json()
}

export const loginuser = async (userData) =>{
    const res = await fetch(`${API}/login`,
        {
            method:"post",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        }
    )
    const data = await res.json()
    return data
}

export const getMyResumes = async () =>{
    const token = localStorage.getItem("token")

    const res= await fetch(`${API}/resume`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    return res.json()
}
