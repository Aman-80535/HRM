import { Header } from "./Header"
import Footer from "./Footer"

export const Home = () => {
	return (
		<>
			<Header />
			<div style={{
			width: "95%",
			padding: "53px 84px 0px 147px",
			display: "flex"
			}}>
				<div>
					<p>Power and Success
						Inspired Life</p>
					<p>Knowledge is the greatest wealth. Financial security is the foundation of a peaceful life. Along with this, when there is mutual cooperation and mutual trust, our life becomes very beautiful.</p>
					<p>Thank you for choosing us as your gateway to a secure life. </p>
					<p>Let's travel together, have a better tomorrow.</p>
				</div>
				<img src="https://s3-alpha-sig.figma.com/img/566c/1580/5f0470c723e82390faf2e8a1592c438d?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c7UwMFfNg~mUU-QWjrajX1Vw8-vuHJpHHjZHupI9hbBauK797HHMOpUqB06DNXl4WhNmYK4uReujrzNvaObw-sHa40ramuCLH6Q0glbKu~W-EKbQjj8pCZjoW8P7j1FXN2yyxkb9Y0UhsoAu6sgXsewt83Z6sGB8kKusxdPj9rMraHfcibudojfcTcGdaf1ke~pfgYeWAwwFm19ZCzgnnJithYfeYAbU710dEEazCb46EFfEk3B3Jrt2jIlFIQELXAkt-q4CsItbmzQlCKLBqfUsXwUQ94FTmk6vZV4udw8jFY7H0DIFHqh6divo9ox-R1~mMdumCe6NsR0-2YPPhg__" alt="" style={{ width: "47%", height: "407px",borderTopLeftRadius:"50px", marginRight: "-80px" }} />
			</div >

			<div style={{
				marginTop:"-80px",
				marginLeft: "159px",
				padding: "25px"
			}}>
				<button class="" style={{ width: "176px", Height: "42px", background: "#043B64", color: "white" }}>Online Courses</button>
				<button class="" style={{ width: "176px", Height: "42px", "margin-left": "18px", }}>Videos</button>
			</div >

			<Footer/>

		</>
	)
}
