import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ErrorMessage } from "../components/Feedback.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    program: "",
    yearOfStudy: "1",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // One handler updates whichever input changed, using its "name" attribute
  function handleChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    try {
      await register(formValues);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-side">
        <h2>Join your campus study community</h2>
        <p>Create an account to find, join and lead study groups.</p>
      </div>
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create account</h1>
        <ErrorMessage message={errorMessage} />
        <label className="field">
          Full name
          <input
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="field">
          Email
          <input
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="field">
          Password
          <input
            name="password"
            type="password"
            minLength={6}
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </label>
        <label className="field">
          Program of study
          <input
            name="program"
            value={formValues.program}
            onChange={handleChange}
            placeholder="e.g. Bachelor of Science in Information Technology"
            required
          />
        </label>
        <label className="field">
          Year of study
          <select
            name="yearOfStudy"
            value={formValues.yearOfStudy}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5].map((year) => (
              <option key={year} value={year}>
                Year {year}
              </option>
            ))}
          </select>
        </label>
        <button className="btn btn-primary btn-block" disabled={isLoading}>
          {isLoading ? "Creating..." : "Sign up"}
        </button>
        <p className="auth-switch">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
