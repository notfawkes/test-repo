import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message || !message.trim()) {
      return Response.json({ success: false, output: "Commit message cannot be empty" }, { status: 400 })
    }

    // Stage all changes
    await execAsync("git add .")

    // Create commit
    const { stdout } = await execAsync(`git commit -m "${message.replace(/"/g, '\\"')}"`)

    return Response.json({
      success: true,
      output: stdout || "Commit created successfully",
    })
  } catch (error: any) {
    return Response.json({
      success: false,
      output: error.stderr || error.message || "Failed to create commit",
    })
  }
}
