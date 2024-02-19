type Props = {
    name: string;
  };
  
  export const DefaultProfilePic = ({ name }: Props) => {
    const colors = [
      "#2C3E50", "#34495E", "#7F8C8D", "#95A5A6", "#BDC3C7",
  "#ECF0F1", "#D35400", "#E74C3C", "#1ABC9C", "#3498DB",
  "#F39C12", "#16A085", "#2980B9", "#E67E22", "#C0392B",
  "#8E44AD", "#2ECC71", "#F1C40F", "#3498DB", "#E74C3C",
  "#27AE60", "#E74C3C", "#16A085", "#2ECC71", "#F39C12"
    ];
    const randomColor = colors[name?.charCodeAt(0) % colors.length];
    const containerStyle = `w-full h-full rounded-full flex items-center`;
    const textStyles = 'uppercase text-white w-full text-center';
    const dynamicColorStyle = { backgroundColor: randomColor };
  
    return (
      <div className={containerStyle} style={dynamicColorStyle}>
        <h1 className={textStyles}>{name?.slice(0, 2)}</h1>
      </div>
    );
  };
  