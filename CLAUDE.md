# Project Constraints & Memory

## Delegating work to sub-agents

Four custom sub-agents are defined in `.claude/agents/*.md` and are real `subagent_type`
options for the Agent tool — call them directly, not via a shelled-out `claude` CLI
invocation (that path doesn't read this repo's agent config; only `.claude/agents/*.md`
and the built-in types do).

- **`microagent`** — a self-contained, well-specified multi-step job (a focused fix, a
  small feature, a test repair) that doesn't need the primary session's conversation
  context. Runs on the default model.
- **`explorer`** — locating files, mapping directories, text searches. Read-only, Haiku.
- **`debugger`** — triaging a large test log or traceback: root cause plus a fix
  blueprint, no edits. Read-only, Haiku.
- **`architect`** — structural refactors, cross-cutting system logic, multi-file bugs
  that need design thought before code. Full tools, Opus.

Structural refactoring and ordinary feature work in the current task stay in the primary
session by default; reach for `microagent`/`architect` when a piece of it is genuinely
separable and would otherwise just burn the primary session's context on mechanical work.
