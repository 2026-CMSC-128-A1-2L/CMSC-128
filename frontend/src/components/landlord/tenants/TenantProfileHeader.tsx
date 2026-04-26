type TenantProfileHeaderProps = {
  displayName: string;
  email: string;
};

const TenantProfileHeader = ({ displayName, email }: TenantProfileHeaderProps) => {
  return (
    <header className="flex flex-col gap-[10px]">
      <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
        Tenant Profile
      </span>
      <h1 className="font-['Inter',sans-serif] text-[24px] font-bold leading-[32px] text-[#024338]">
        {displayName}
      </h1>
      <a
        href={`mailto:${email}`}
        className="font-['Inter',sans-serif] text-[14px] font-bold text-[#096c5b] hover:underline"
      >
        {email}
      </a>
    </header>
  );
};

export default TenantProfileHeader;
