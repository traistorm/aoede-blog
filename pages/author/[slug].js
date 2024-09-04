import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {getProfile} from "../../api/user.api";
import Container from "../../components/container";
import DefaultLayout from "../../layout/defaultlayout/default.layout";
import {useRouter} from "next/router";
import ContainerPage from "../../components/container-page";

export default function Author({ settings }) {
    const [profile, setProfile] = useState({})
    const router = useRouter();
    useEffect(() => {
        if (router.query.slug) {
            getProfile(router.query.slug).then((res) => {
                setProfile(res);
            }, (err) => {

            })
        }
    }, [router.query.slug]);
    return (
        <Container>
            <ContainerPage>
                <div className="flex flex-col items-center justify-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full">
                        <img src="https://static.vecteezy.com/system/resources/previews/027/245/487/non_2x/male-3d-avatar-free-png.png" alt="author.png" />
                    </div>
                    <h1 className="text-brand-primary mt-2 text-3xl font-semibold tracking-tight dark:text-white lg:text-3xl lg:leading-tight">{profile?.fullName}</h1>
                </div>
                <div className="mx-auto mt-2 flex max-w-xl flex-col px-5 text-center text-gray-500">
                    <p>{profile?.bio}</p>
                </div>
            </ContainerPage>
        </Container>
    );
}
Author.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}