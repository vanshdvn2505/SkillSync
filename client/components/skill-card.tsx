interface SkillCardProps {
    title: string;
    link: any; 
}
  
  const SkillCard: React.FC<SkillCardProps> = ({ title, link }) => {
    return (
      <div className="flex w-36 py-3 px-2 bg-[hsl(255deg 18.18% 4.31%)] justify-center items-center gap-2 rounded-lg">
        <div className="link-icon">
        <img src={link} alt={title} width={52} height={52} />
        </div>
        <h2 className="text-white">{title}</h2>
      </div>
    );
  }
  
  export default SkillCard;
  