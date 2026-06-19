import { Link } from "react-router";


const Header = () => {
  return (
    <div className="bg-black">
      <div className="md:w-730px m x-auto flex w-full items-center justify-between p-5 md:p-3">
        <img src="./mountain.png" alt="" />

        <Link to="/login">Entrar
        <div className="w-130px h-35px flex cursor-pointer items-center justify-center rounded-lg bg-amber-50">
          Entrar
        </div>
        </Link>
      </div>
    </div>
  );
};
export default Header;
