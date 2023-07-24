import { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/useAuth";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const { passwordReset } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await passwordReset(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Could not reset password. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mb-3">
          <Link to="/login">Login</Link>
        </div>
        {message && <Alert variant="success">{message}</Alert>}
      </Card>
      <div className="w-100 text-center mb-3">
        Don&apos;t have an account yet? <br />
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
