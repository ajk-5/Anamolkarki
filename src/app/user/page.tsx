import LoginForm from "@/components/LoginForm";
import RegistrationForm from "@/components/RegistrationForm";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "log in",
  description: "my login",
};

export default function User() {
    return (
      
  <div className="background ">
    <main className="background">
        <RegistrationForm/>
        <LoginForm/>
        </main>
        <footer>
  
        </footer>
      </div>
    );
  }