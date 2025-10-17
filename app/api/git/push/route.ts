import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function POST() {
  try {
    const { stdout } = await execAsync("git push origin main")

    return Response.json({
      success: true,
      output: stdout || "Push completed successfully",
    })
  } catch (error: any) {
    return Response.json({
      success: false,
      output: error.stderr || error.message || "Failed to push",
    })
  }
}
