import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Categories from "./Categories";
import OurServices from "./OurServices";
import SpecialDishes from "./SpecialDishes";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Categories></Categories>
           <SpecialDishes></SpecialDishes>
           <Testimonials></Testimonials>
           <OurServices></OurServices>
        </div>
    );
};

export default Home;