import {IUser} from "../Interfaces/User";

export function TableUsers(props: {users: IUser[]}): JSX.Element {
  const {users}= props;

  if(!users) {
    return <></>
  }

  return (
    <>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
        </tr>
        </thead>
        <tbody>
        {
          users.map(({name, surname}, index) => {

            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{surname}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </>
  )
}