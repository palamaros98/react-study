import {useEffect, useState} from "react";

const hostApi = 'https://hub.palamaros.com/api/testApi';

export function UsersFromBack(): JSX.Element {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${hostApi}`)
      .then((response) => {
        if(response.status !== 200) {
          throw new Error(`Status code ${response.status}`)
        }

        return response.json();
      })
      .then((json) => {
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [])

  return (
    <>

    </>
  )
}