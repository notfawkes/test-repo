import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function GET() {
  try {
    const { stdout } = await execAsync('git log --oneline -20 --format="%H|%s|%an|%ar"')

    const commits = stdout
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        const [hash, message, author, date] = line.split("|")
        return { hash, message, author, date }
      })

    return Response.json({
      success: true,
      commits,
    })
  } catch (error: any) {
    return Response.json({
      success: true,
      commits: [],
    })
  }
}
