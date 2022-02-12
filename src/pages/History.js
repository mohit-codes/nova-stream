import { useEffect, useState } from "react";
import { userActions } from "../hooks/userActions";
import { NormalVideoListing } from "../containers/NormalVideoListing";
import { Loading } from "../components/Loading";

export const History = () => {
  const { fetchHistory, loading, resetHistory } = userActions();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const responseHistory = await fetchHistory();
      setHistory(responseHistory);
    })();
  }, []);

  const resetHandler = async () => {
    await resetHistory();
  };

  const noHistory = history.length < 1;

  return (
    <div className="pt-[10vh]">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            {noHistory && <p className="text-center w-full">No History</p>}
            {!noHistory && (
              <>
                <p className="font-semibold text-2xl ml-4">History</p>
                <NormalVideoListing videos={history} dontShowTitle={true} />
              </>
            )}
          </div>
          {!noHistory && (
            <button
              className="border-2 border-white text-white py-1 px-2 m-5 rounded-md"
              onClick={resetHandler}
              disabled={loading}
            >
              Clear History
            </button>
          )}
        </>
      )}
    </div>
  );
};
