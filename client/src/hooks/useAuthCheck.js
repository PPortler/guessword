import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuthCheck = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(`${process.env.REACT_APP_PORT_API}/auth`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.status === 200 && res.data.authenticated) {
                    setUser(res.data.user); // ใช้ res.data.user แทน res.user
                } else {
                    setUser(null);
                    navigate("/sign-in");
                }
            } catch (err) {
                setUser(false);
                console.log(err)
            }
        }

        checkAuth();
    }, [navigate])

    return user
}

export default useAuthCheck