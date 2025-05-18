import jwt from "jsonwebtoken"

export async function verifyAuth(request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        success: false,
        message: "Unauthorized: Missing or invalid token format",
        status: 401,
      }
    }

    // Extract the token
    const token = authHeader.split(" ")[1]

    if (!token) {
      return {
        success: false,
        message: "Unauthorized: Missing token",
        status: 401,
      }
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Return success with the decoded user
    return {
      success: true,
      user: decoded,
    }
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return {
        success: false,
        message: "Unauthorized: Invalid or expired token",
        status: 401,
      }
    }

    return {
      success: false,
      message: "Internal server error during authentication",
      status: 500,
    }
  }
}
