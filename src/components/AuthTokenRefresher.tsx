'use client'

import { onIdTokenChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { useEffect } from "react";

export default function AuthTokenRefresher() {
    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken(); // Firebase renova automaticamente
                document.cookie = `auth=${token}; path=/; max-age=86400`;
            }
        });

        return () => unsubscribe();
    }, []);

    return null; // não renderiza nada
}
