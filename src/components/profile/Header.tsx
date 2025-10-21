export const Header = ({ dict }: { dict: any }) => {
  return (
    <div className="mb-[2rem]">
      <h1 className="text-[2.5rem] font-bold text-foreground mb-[0.5em]">
        {dict.auth.profile.title}
      </h1>
      <p className="text-[1.1em] text-muted-foreground">
        {dict.auth.profile.subtitle}
      </p>
    </div>
  );
};
