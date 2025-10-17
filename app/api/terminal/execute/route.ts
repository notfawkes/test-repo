import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    const { command } = await request.json()

    if (!command || typeof command !== "string") {
      return Response.json({ success: false, output: "Invalid command" }, { status: 400 })
    }

    // Security: Prevent dangerous commands
    const dangerousPatterns = [/rm\s+-rf\s+\//, /mkfs/, /dd\s+if=\/dev\/zero/, /:$$$$\s*{\s*:\|\s*:\s*&\s*\}\s*;/]

    if (dangerousPatterns.some((pattern) => pattern.test(command))) {
      return Response.json({ success: false, output: "Command not allowed for security reasons" }, { status: 403 })
    }

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 30000,
        maxBuffer: 1024 * 1024 * 10,
      })

      const output = stdout || stderr || "Command executed successfully"
      return Response.json({
        success: true,
        output: output.trim(),
      })
    } catch (error: any) {
      return Response.json({
        success: false,
        output: error.stderr || error.message || "Command failed",
      })
    }
  } catch (error) {
    return Response.json({ success: false, output: "Server error: " + (error as Error).message }, { status: 500 })
  }
}
