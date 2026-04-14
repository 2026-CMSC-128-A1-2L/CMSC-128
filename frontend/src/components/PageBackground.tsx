const PageBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-white">

      {/* Top-right group */}
      <div className="opacity-50">
        <div className="absolute -top-[250px] -right-[300px] w-[450px] h-[450px] rounded-full bg-[#096C5B]" />
        <div className="absolute -top-[230px] -right-[280px] w-[400px] h-[400px] rounded-full bg-[#2F8677]" />
        <div className="absolute -top-[210px] -right-[260px] w-[350px] h-[350px] rounded-full bg-[#7dbdaa]" />
      </div>


    </div>
  );
};

export default PageBackground;
