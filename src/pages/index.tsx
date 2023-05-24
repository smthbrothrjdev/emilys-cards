import { type NextPage } from "next";
import Head from "next/head";
import { SignInButton, useOrganizationList, UserButton, useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";

const CreateFlashCard = () => {
  const { user } = useUser();
  const { organizationList } = useOrganizationList();

  if (!user) return null;

  console.log(organizationList);
  return (
    <div className="flex w-full gap-4 justify-between">
      {organizationList &&
      organizationList[0]?.organization.name === "users" ? (
        <img
          src={user.profileImageUrl}
          alt="user profile image"
          className="h-20 w-20 rounded-full"
        />) : (
        <UserButton appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 80,
              height: 80
            }
          }
        }} />)}
      {organizationList &&
      organizationList[0]?.organization.name === "Admins" ? (
        <input
          placeholder="enter the word here"
          className="grow bg-transparent text-3xl outline-none"
        />
      ) : (
        <button
          type="button"
          className="justify-center rounded-3xl border-4 border-double border-purple-500 bg-purple-700 pr-5 text-3xl "
        >
          😀🎮 Play Normal
        </button>
      )}
    </div>
  );
};
const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.wordcards.getAll.useQuery();

  if (isLoading) return <div>...Loading</div>;
  if (!data) return <div>No data was found....</div>;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full md:max-w-2xl">
          <div className="flex justify-center bg-transparent p-4">
            {!user.isSignedIn && (
              <div className="flex justify-center w-1/3 bg-fuchsia-500 text-3xl rounded-3xl ">
                <SignInButton />
              </div>
            )}
            {user.isSignedIn && <CreateFlashCard />}
          </div>
          <div className="flex flex-col text-2xl">
            {user.isSignedIn ? data?.map((card) => (
              <>
                <div className=" bg-fuchsia-300 border-purple-400 p-8 border shadow shadow-pink-900" key={card.id}>
                  {card.word}

                </div>
                <div className="py-2"></div>
              </>
            )) : null}

          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
