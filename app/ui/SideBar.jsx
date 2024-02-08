'use client'

import Image from "next/image";
import logo from "@/public/logo.png";

import Link from "next/link";
import { MdOutlineEventNote } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BiCameraMovie } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { AiOutlineAudit } from "react-icons/ai";
import { FaChartSimple } from "react-icons/fa6";
import { MdDesignServices } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import "@/app/styles/menu.scss";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SideBar = () => {

  const router = useRouter()
  const handleLogout = async () => {
    try {
      await axios.get("/api/admin");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Error logout")
      
    }
  };

  const menu = [
    {
      id: "1",
      title: "Home",
      icon: <FaHome />,
      src: "/dashboard",
    },
    {
      id: "2",
      title: "Programs",
      icon: <MdOutlineEventNote />,
      src: "/dashboard/programs",
    },
    {
      id: "3",
      title: "Participants",
      icon: <HiMiniUserGroup />,
      src: "/dashboard/participants",
    },
    {
      id: "4",
      title: "Evaluation",
      icon: <AiOutlineAudit />,
      src: "/dashboard/evaluation",
    },
    {
      id: "5",
      title: "Results",
      icon: <FaChartSimple />,
      src: "/dashboard/results",
    },
    {
      id: "6",
      title: "Poster",
      icon: <MdDesignServices />,
      src: "/dashboard/poster",
    },
    {
      id: "7",
      title: "Halls",
      icon: <FaLayerGroup />,
      src: "/dashboard/halls",
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo flex items-center justify-center">
        {/* Use the 'src' attribute to specify the image source */}
        <Image src={logo} alt="logo" width={200} height={250} />
      </div>

      <div className="menu-container  ">
        <div className="menu">
          {menu.map((item) => (
            <div key={item.id} className="">
              {/* Wrap the 'Link' component around the 'li' element */}
              <ul className=" u-list ">
                <Link
                  className="link  flex flex-row items-center "
                  href={item.src}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 flex-1 items-center justify-center">
        <Button  onClick={handleLogout} variant={"outline"}>Logout</Button>
      </div>
    </div>
  );
};

export default SideBar;
