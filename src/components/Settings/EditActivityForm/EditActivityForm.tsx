// External imports
import React from "react"
import {RouteComponentProps} from "react-router-dom";

interface MatchParams {
    categoryid: string
}

interface EditActivityFormProps extends RouteComponentProps<MatchParams> {
    long: string
    short: string
    archived: boolean
}

const EditActivityForm:React.FC<EditActivityFormProps> = ({long, short, archived, match}) => {
    const categoryid = match.params.categoryid

    const [activityLong, setActivityLong] = React.useState<string>(long)
    const [activityShort, setActivityShort] = React.useState<string>(short)
    const [activityArchived, setActivityArchived] = React.useState<boolean>(archived)

    return (
        <section>
            <h1>Edit activity</h1>

            <form>
                <label htmlFor={"long"}>Long description</label>
                <input
                    name={"long"}
                    type="text"
                    value={activityLong}
                    onChange={(e) => setActivityLong(e.target.value)}
                    className={"activity-list-long-input"}
                    maxLength={40}
                />
                -
                <label htmlFor={"short"}>Short abbreviation</label>
                <input
                    name={"short"}
                    type="text"
                    value={activityShort}
                    onChange={(e) => setActivityShort(e.target.value)}
                    className={"activity-list-short-input"}
                    maxLength={2}
                />
            </form>
        </section>
    )
}

export default EditActivityForm
