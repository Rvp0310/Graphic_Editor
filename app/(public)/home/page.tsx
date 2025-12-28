import FileTypes from "../../components/FileTypes";

export default function Home() {
  return (
    <>
      <FileTypes />
      <div className="tapered-line"></div>
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-sm phrase">Saved files are available here after login</p>
      </div>
    </>
  );
}