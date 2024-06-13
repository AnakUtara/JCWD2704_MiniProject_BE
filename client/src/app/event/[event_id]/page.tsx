import { axiosInstance } from "@/app/_libs/axios.config";
import { TEvent } from "@/app/_models/event.model";
import { imageUrl } from "@/app/_utils/config";
import Image from "next/image";
import CreateReview from "./_components/add_review";
import StarRating from "./_components/starRating";
import EventTabs from "./_components/event.tabs";
import ReviewTabs from "./_components/review.tabs";
import Details from "./_components/details.data";
import OrderTab from "./_components/details.transaction";
import DetailTab from "./_components/details.data";

type Props = { params: { event_id: string } };
export default async function EventDetails({ params }: Props) {
  ``;
  const { event_id } = params;
  const res = await axiosInstance().get(`/events/${event_id}`);
  const { data }: { data: TEvent } = await res.data;

  console.log(data);

  return (
    <div className="container mx-auto w-full">
      <div className="gap-6 md:flex md:flex-row">
        <div className="relative h-[180px] w-full md:h-[100vh] md:w-[40%]">
          <Image
            src={imageUrl + "/events/" + data.image_url}
            alt="1"
            fill={true}
            priority
            className=" rounded-md object-cover"
          />
          <div className="absolute left-5 top-5 bg-slate-600 bg-opacity-50 text-4xl text-white">
            {data.title}
          </div>
          <div className="absolute bottom-5 right-5 flex flex-row items-center bg-slate-600 bg-opacity-50 ">
            <p className="text-md  text-white">Event rating :</p>
            {data.ratingEvent ? (
              <StarRating
                rating={data.ratingEvent}
                size="md"
                colour="white"
                name="ratingEvent"
              />
            ) : (
              <p className="text-md font-semibold text-white">Not rated yet</p>
            )}
          </div>
        </div>
        {/* detail content */}
        <div className=" mt-4 flex flex-col gap-4 md:mt-0 md:w-[60%] ">
          <div className="mb-auto h-[60%]">
            <EventTabs
              tab1={<DetailTab data={data} />}
              tab2={
                <div>
                  <OrderTab data={data} />
                </div>
              }
            />
          </div>

          <div className="mt-auto h-[50%]">
            <ReviewTabs tab1={<CreateReview data={data} />} />
          </div>
        </div>
      </div>
    </div>
  );
}
