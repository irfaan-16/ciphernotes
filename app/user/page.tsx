import { getSession, useSession } from "next-auth/react";

const page = ({ notes }: any) => {
    const { data: session } = useSession();
    console.log(notes);

    return <h1>User page</h1>;
};
export async function getServerSideProps(context: any) {
    const { req } = context;
    const session = await getSession({ req });
    const email = session?.user?.email;
    const res = await fetch(`../api/getnotes?email=${email}`);
    const { notes } = await res.json();
    return {
        props: {
            notes,
        },
    };
}
export default page;
