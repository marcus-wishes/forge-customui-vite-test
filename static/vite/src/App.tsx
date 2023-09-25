import { useEffect, useState } from "react"
import { events, invoke } from "@forge/bridge"
import "./App.css"

function App() {
	const [count, setCount] = useState(0)
	const [labels, setLabels] = useState<string[]>([])

	useEffect(() => {
		const handleFetchSuccess = (labels: string[]) => {
			setLabels(labels)
		}
		const handleFetchError = () => {
			console.error("Failed to get labels")
		}

		const subscribeForIssueChangedEvent = () =>
			events.on("JIRA_ISSUE_CHANGED", () => {
				invoke<string[]>("fetchLabels")
					.then(handleFetchSuccess)
					.catch(handleFetchError)
			})
		const subscription = subscribeForIssueChangedEvent()

		invoke<string[]>("fetchLabels")
			.then(handleFetchSuccess)
			.catch(handleFetchError)

		return () => {
			subscription.then((subscription) => subscription.unsubscribe())
		}
	}, [])

	return (
		<>
			<button onClick={() => setCount((count) => count + 1)}>
				count is {count}
				<div
					style={{
						paddingTop: "10px",
					}}
				>
					{labels.map((label) => (
						<div>{label}</div>
					))}
				</div>
			</button>
		</>
	)
}

export default App
