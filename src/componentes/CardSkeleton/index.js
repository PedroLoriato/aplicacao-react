import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardSkeleton() {
    return (
        <SkeletonTheme baseColor="gray" highlightColor="#fff">
            <Skeleton width={"200px"} height={"150px"}/>
            <div style={{ zIndex: 2, position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', bottom: "0", padding: '10px', height: "30%" }}>
                <Skeleton width={"250px"} height={"18px"} style={{ marginTop: "20px" }}/>
                <Skeleton width={"150px"} height={"12px"} style={{ marginTop: "15px" }}/>
            </div>
        </SkeletonTheme>
    );
}

export default CardSkeleton;