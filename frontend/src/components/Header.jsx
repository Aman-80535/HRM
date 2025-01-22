import { Link } from 'react-router-dom';



export const Header = () => {
	return (
		<>
			<div className="w-100" style={{ background: "#043B64", width: "1440px", height: "101px" }}>
				<img src="https://s3-alpha-sig.figma.com/img/5e82/7775/f6c8d4c3a3f7055f7b3650b64a7cd789?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J~1w4JTElo-rDr-LJ5O68fFJJQDE-Hckurt6FZ3vpwtyPYJ0FFIyQStPthBWOejWuNF6qzZGI071CFh5CLofsRBSssWHbAXkz-EfRg7HenIvu8bdhMk46E7HOpNSlzjxmpP9rw76udiTsRc5sJmF13CIeg740rZ8yfirL6U2xmXLietPc6t9SgWeNui4AIDUWjS7Z3QoZLRD4Dghob7FYEZDLXOD5h6VkhsDCQj6j63MrT8xqOz19dDbzxR-EdMGGp7Tqlcm50eXHuB59q-8jbQTXckR7cKmXdDEE7tG2cOKh~cgYgjBcPyu~QBEJGDHvZOB-wIUoYPMYN24f1FTRQ__" alt="" style={{ width: "165px", height: "69px", "margin-top": "13px", "margin-left": "13px" }} />
				<Link to="/user/login">
					<button style={{ width: "115.4px", height: "33px", margin: "-24px 0px 0px 884px" }}>
						Login
					</button>
				</Link>
				<Link to="/user/signup">
					<button style={{ width: "115.4px", height: "33px", margin: "-29px 0px 0px 20px" }}>Sign Up</button>
				</Link>
			</div>
		</>
	)
}
