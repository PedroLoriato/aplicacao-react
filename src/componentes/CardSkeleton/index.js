import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import appEstilos from "../../App.module.css";

function CardSkeleton() {
    return (
        <SkeletonTheme baseColor="gray" highlightColor="#fff">
            <Skeleton width={"200px"} height={"150px"}/>
            <div className={appEstilos.DfCol}>
                <Skeleton width={"250px"} height={"18px"}/>
                <Skeleton width={"150px"} height={"12px"}/>
            </div>
        </SkeletonTheme>
    );
}

export default CardSkeleton;