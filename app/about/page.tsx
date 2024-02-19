'use client'
import { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "../components/Route/About";
import Footer from "../components/Route/Footer";

interface Props {

}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  return (
    <div>
        <Heading
          title="About E-learing"
          description="E-learing is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN,Redux,Machine learning"
        />
        <Header
        open={open}
        setOpen={setOpen}
        activeItem={2}
        route={route}
        setRoute={setRoute}
        />
        <About />
        <Footer/>
    </div>
  )
};


export default Page;