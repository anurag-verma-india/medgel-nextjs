import PopupContext from "@/app/contexts/PopupContext";
import { redirect, RedirectType } from "next/navigation";
import { useContext } from "react";

function RightPointerBracketSvg() {
  return (
    <svg
      fill="#a6a6a6"
      className="w-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
    >
      <path d="M250.606 154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213.001-5.857 5.858-5.857 15.355.001 21.213l139.393 139.39L79.393 304.394c-5.857 5.858-5.857 15.355.001 21.213C82.322 328.536 86.161 330 90 330s7.678-1.464 10.607-4.394l149.999-150.004a14.996 14.996 0 000-21.213z" />
    </svg>
  );
}

type ListItemType = {
  ListTitle: string;
  NumberOfProducts: number;
  ListId: string;
};

const ListItem = ({ ListTitle, NumberOfProducts, ListId }: ListItemType) => {
  const { popupState, setPopupState } = useContext(PopupContext);

  const HandleListClick = (listId: string) => {
    if (popupState.tokenValid) {
      // TODO: This Page's API call must also check user's JWT token from cookies
      redirect(`/pages/product-list/${listId}`, RedirectType.push);
    } else {
      setPopupState({ ...popupState, popupOpen: !popupState.popupOpen });
      console.log("Popup state: ", popupState);
    }
  };

  return (
    <div
      className="m-6 flex flex-row rounded-xl bg-white px-2 py-3 text-2xl text-orange-400"
      onClick={() => {
        HandleListClick(ListId);
      }}
    >
      <p className="w-full">{ListTitle}</p>
      <div className="flex min-w-fit flex-row text-neutral-500">
        <p className="min-w-fit">{NumberOfProducts} Products</p>
        <RightPointerBracketSvg />
      </div>
    </div>
  );
};

export default ListItem;
