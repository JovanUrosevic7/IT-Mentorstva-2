export {}


type LogLevel = "INFO" | "WARNING" | "ERROR"

type LogEntry = [string, Date, LogLevel]

const serverLogs: LogEntry[] = [
    ["Desila se greska 222", new Date("2026:01:03 00:02:32"), "WARNING"]
]


