import { Fragment } from "react";
import { Menu, Transition, Disclosure } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import cx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { myLoader } from "../utils/all";
import Container from "./container";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {useSelector} from "react-redux";

export default function Navbar(props) {
  const user = useSelector(state => state.user);
  const leftmenu = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Posts",
      href: "/post"
    }
  ];

  const rightmenu = [
    /*{
      label: "About",
      href: "/about"
    },*/
    {
      label: "Contact",
      href: "/contact"
    },
    {
      label: "Login",
      href: "/login",
      children: [
        { title: user?.fullName, path: `/author/${user?.id}` },
        ...(user?.isAdmin ? [{ title: 'Create post', path: `/create-post` }] : []),
        { title: "Logout", path: "/" },
      ],
    },
    /*{
      label: "Pro Version",
      href: "https://stablo-pro.web3templates.com/",
      external: true,
      badge: "new"
    },
    {
      label: "Download",
      href: "https://web3templates.com/templates/stablo-minimal-blog-website-template",
      external: true
    }*/
  ];

  const mobilemenu = [...leftmenu, ...rightmenu];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                  {leftmenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children && item.children.length > 0 ? (
                        <DropdownMenuCustom
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                          user={user}
                        />
                      ) : (
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="px-5 py-2 text-base font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}>
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="flex w-full items-center justify-between md:w-auto">
                  <Link href="/" className="w-28 dark:hidden">
                    <Image
                        src="https://i.ibb.co/gFdFwcr/Ao-E-DE-DM-8-14-2024-2.png"
                        alt="Logo"
                        priority={true}
                        width={160}
                        height={80}
                        sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </Link>
                  <Link href="/" className="hidden w-28 dark:block">
                    <Image
                        src="https://i.ibb.co/dJqG1hp/Ao-E-DE-DM-8-14-2024-3.png"
                        alt="Logo"
                        priority={true}
                        width={160}
                        height={80}
                        sizes="(max-width: 640px) 100vw, 200px"
                    />
                  </Link>
                  <Disclosure.Button
                    aria-label="Toggle Menu"
                    className="ml-auto rounded-md px-2 py-1 text-gray-500 focus:text-blue-500 focus:outline-none dark:text-gray-300 md:hidden ">
                    <svg
                      className="h-6 w-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24">
                      {open && (
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                        />
                      )}
                      {!open && (
                        <path
                          fillRule="evenodd"
                          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>

                <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                  {rightmenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children && item.children.length > 0 ? (
                        <DropdownMenuCustom
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                          user={user}
                        />
                      ) /*: item.label === 'Login' && user ? (
                          <Dropdown>
                            <DropdownTrigger>
                              <div className="px-5 cursor-pointer transition-all hover:scale-110">
                                <Image
                                    src={"https://m.media-amazon.com/images/I/71+17bVYHxL._AC_UF1000,1000_QL80_.jpg"}
                                    alt={"avatar"}
                                    className="rounded-full"
                                    height={35}
                                    width={35}
                                />
                              </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                className="bg-gray-100 p-2 rounded-md"
                                aria-label="Example with disabled actions"
                                disabledKeys={["edit", "delete"]}
                            >
                              <DropdownItem key="new" className="hover:text-blue-500 mb-2">{user.username}</DropdownItem>
                              <DropdownItem key="copy" className="hover:text-blue-500 mb-2">Logout</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                      )*/ : (
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="px-5 py-2 text-base font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}>
                          <span> {item.label}</span>
                          {item.badge && (
                            <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-cyan-200 dark:text-blue-800 ">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
              <Disclosure.Panel>
                <div className="order-2 -ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden">
                  {mobilemenu.map((item, index) => (
                    <Fragment key={`${item.label}${index}`}>
                      {item.children && item.children.length > 0 ? (
                        <DropdownMenuCustom
                          menu={item}
                          key={`${item.label}${index}`}
                          items={item.children}
                          mobile={true}
                          user={user}
                        />
                      ) : item.label === 'Login' && user ? (
                          <Link
                              href={item.href}
                              key={`${item.label}${index}`}
                              className="w-full px-5 py-2 text-base font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                              target={item.external ? "_blank" : ""}
                              rel={item.external ? "noopener" : ""}>
                            Profile
                          </Link>
                      ) : (
                        <Link
                          href={item.href}
                          key={`${item.label}${index}`}
                          className="w-full px-5 py-2 text-base font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                          target={item.external ? "_blank" : ""}
                          rel={item.external ? "noopener" : ""}>
                          {item.label}
                        </Link>
                      )}
                    </Fragment>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}

const DropdownMenuCustom = ({ menu, items, mobile, user }) => {
  return (
      <>
        {
          user? (
              <Menu
                  as="div"
                  className={cx("relative text-left", mobile && "w-full")}>
                {({ open }) => (
                    <>
                      {menu.label === 'Login' && user && !mobile ? (
                          <Menu.Button className="outline-none transition-all focus:outline-none">
                            <div className="px-5 cursor-pointer transition-all hover:scale-110">
                              <Image
                                  src={"https://m.media-amazon.com/images/I/71+17bVYHxL._AC_UF1000,1000_QL80_.jpg"}
                                  alt={"avatar"}
                                  className="rounded-full"
                                  height={35}
                                  width={35}
                              />
                            </div>
                          </Menu.Button>
                      ) : (
                          <Menu.Button
                              className={cx(
                                  "text-base flex items-center gap-x-1 rounded-md px-5 py-2 font-medium outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
                                  open
                                      ? "text-blue-500 hover:text-blue-500"
                                      : "text-gray-600 dark:text-gray-400",
                                  mobile ? "w-full px-4 py-2" : "inline-block px-4 py-2"
                              )}
                          >
                            {
                              user? (
                                  <span>Profile</span>
                              ) : (
                                  <span>{menu.label}</span>
                              )
                            }
                            <ChevronDownIcon className="mt-0.5 h-4 w-4" />
                          </Menu.Button>
                      )}
                      <Transition
                          as={Fragment}
                          enter="lg:transition lg:ease-out lg:duration-100"
                          enterFrom="lg:transform lg:opacity-0 lg:scale-95"
                          enterTo="lg:transform lg:opacity-100 lg:scale-100"
                          leave="lg:transition lg:ease-in lg:duration-75"
                          leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
                          leaveTo="lg:transform lg:opacity-0 lg:scale-95">
                        {
                          !mobile? (
                              <Menu.Items
                                  className={cx(
                                      "w-32 z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0",
                                      !mobile && "bg-white shadow-lg  dark:bg-gray-800"
                                  )}>
                                <div className={cx(!mobile && "py-3")}>
                                  {items.map((item, index) => (
                                      <Menu.Item as="div" key={`${item.title}${index}`}>
                                        {({ active }) => (
                                            <Link
                                                href={item?.path ? item.path : "#"}
                                                className={cx(
                                                    "flex items-center space-x-2 px-5 py-2 text-base lg:space-x-4",
                                                    active
                                                        ? "text-blue-500"
                                                        : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                                                )}>
                                              <span> {item.title}</span>
                                            </Link>
                                        )}
                                      </Menu.Item>
                                  ))}
                                </div>
                              </Menu.Items>
                          ) : (
                              <Menu.Items
                                  className={cx(
                                      "ml-3 z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0",
                                      !mobile && "bg-white shadow-lg  dark:bg-gray-800"
                                  )}>
                                <div className={cx(!mobile && "py-3")}>
                                  {items.map((item, index) => (
                                      <Menu.Item as="div" key={`${item.title}${index}`}>
                                        {({ active }) => (
                                            <Link
                                                href={item?.path ? item.path : "#"}
                                                className={cx(
                                                    "flex items-center space-x-2 px-5 py-2 text-base lg:space-x-4",
                                                    active
                                                        ? "text-blue-500"
                                                        : "text-gray-700 hover:text-blue-500 focus:text-blue-500 dark:text-gray-300"
                                                )}>
                                              <span> {item.title}</span>
                                            </Link>
                                        )}
                                      </Menu.Item>
                                  ))}
                                </div>
                              </Menu.Items>
                          )
                        }
                      </Transition>
                    </>
                )}
              </Menu>
          ) : (
              <Link
                  href={menu.href}
                  className="w-full px-5 py-2 text-base font-medium text-gray-600 hover:text-blue-500 dark:text-gray-400"
                  target={menu.external ? "_blank" : ""}
                  rel={menu.external ? "noopener" : ""}>
                {menu.label}
              </Link>
          )
        }
      </>
  );
};
