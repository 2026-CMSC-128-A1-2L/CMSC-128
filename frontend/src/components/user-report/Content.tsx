import CurrentDormInfoCard from "../CurrentDormInfoCard"
import StepIndicator from "../StepIndicator"
export default function Content() {
    return (
        <div>
            <CurrentDormInfoCard />
            <StepIndicator />
            <p>
                Your safety and comfort are our top priorities. 
                If something isn't right, let us know. This simple three-step process 
                helps us understand the issue clearly so we can take the necessary 
                steps to resolve it quickly and keep our community secure.
            </p>
            <div className="flex flex-col">
                <p>Frequently asked questions</p>
                <div className="grid grid-cols-2">
                    <p>What happens next?</p>
                    <p>What happens next?</p>
                    <p>What happens next?</p>
                    <p>What happens next?</p>
                </div>
            </div>
            <div className="flex">
                <button>Go Back</button>
                <button>Proceed</button>
            </div>
        </div>
    )
}
