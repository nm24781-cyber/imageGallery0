import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    maxWidth: 345,
    margin: 20,
    width: 350,
    height: 350,
    border: "1px solid #29b6f6"
  },
  cardImage: {
    height: 250
  },
  avatar: {
    display: "flex",
    padding: theme.spacing(2, 4, 3)
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: 15,
    border: "2px solid black"
  },
  image: {
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 4, 3)
  },
  typography: {
    padding: "2%",
    margin: "auto auto",
    fontFamily: ["Roboto"].join(",")
  }
}));

export function CardGenerator(props) {
  const classes = useStyles();
  const { urls, likes: Likes, user, id } = props.item;

  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [likes, setLikes] = useState(0);
  const [userName, setUserName] = useState("");
  const [InstaId, setInstaId] = useState("");
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [twitterUserName, setTwitterUserName] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const handleOpen = (info) => {
    setOpen(true);
    setImg(info.urls.thumb);
    setFirst_name(info.user.first_name);
    setLast_name(info.user.last_name);
    setLikes(info.likes);
    setInstaId(info.user.instagram_username);
    setPortfolioUrl(info.user.portfolio_url);
    setProfileImg(info.user.profile_image.small);
    setTwitterUserName(info.user.twitter_username);
    setUserName(info.user.username);
    setTotalPhotos(info.user.total_photos);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function renderPortfolioUrl() {
    if (portfolioUrl) {
      return (
        <Typography className={classes.typography}>
          <a href={portfolioUrl}>Portfolio URL</a>{" "}
        </Typography>
      );
    }
  }

  function renderTwitterID() {
    if (twitterUserName)
      return (
        <div className={classes.typography}>
          TwitterId : {twitterUserName.toUpperCase()}{" "}
        </div>
      );
  }

  function renderInstaID() {
    if (InstaId)
      return (
        <div className={classes.typography}>
          InstagramId : {InstaId.toUpperCase()}{" "}
        </div>
      );
  }

  return (
    <div>
      <Card className={classes.root} key={id}>
        <CardActionArea>
          <CardMedia
            className={classes.cardImage}
            height="140"
            component="img"
            image={urls.thumb}
            title={user.name}
            onClick={() => handleOpen(props.item)}
          />
          <CardContent>
            <FontAwesomeIcon icon={faThumbsUp} size={"2x"} color={"darkred"} />{" "}
            {Likes}
            <br></br>
            <br></br>
            <FontAwesomeIcon icon={faUser} size={"2x"} color={"p"} />{" "}
            {user.name}
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <img
                className={classes.image}
                src={img}
                alt="content not available"
              />
              <div className={classes.avatar}>
                {" "}
                <Avatar
                  className={classes.small}
                  alt="Remy Sharp"
                  src={profileImg}
                />{" "}
                <span>
                  {first_name} {last_name}
                </span>{" "}
              </div>
              <div className={classes.typography}>
                User Name : {userName.toUpperCase()}{" "}
              </div>
              <div className={classes.typography}>
                Total Photos : {totalPhotos}{" "}
              </div>
              <div className={classes.typography}>Likes : {likes}</div>
              {renderTwitterID()}
              {renderInstaID()}
              {renderPortfolioUrl()}
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
