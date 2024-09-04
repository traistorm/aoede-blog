export default function ContainerPage(props) {
  return (
    <div className="min-h-[500px] sm:min-h-[650px] md:min-h-[650px] lg:min-h-[650px] xl:min-h-[650px] 2xl:min-h-[650px]">
        {props.children}
    </div>
  );
}
