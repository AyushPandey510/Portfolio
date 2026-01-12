const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-foreground py-8 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-heading tracking-tighter">AP.</span>
          <span className="text-muted-foreground">© {currentYear}</span>
        </div>
        
        <p className="text-sm text-muted-foreground text-center md:text-right">
          Designed & Built with passion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
