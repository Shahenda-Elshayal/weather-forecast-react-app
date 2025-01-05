import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// external libraries
import axios from 'axios';
import moment from 'moment';
import "moment/min/locales";
moment.locale("en");

export default function Weather() {

    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState('en');

    const [date, setDate] = useState("");
    const [location, setLocation] = useState({ city: "", latitude: null, longitude: null });
    const [temp, setTemp] = useState({
        num: "",
        description: "",
        high: "",
        low: "",
        icon: "",
        feel: "",
    });

    const theme = createTheme({
        typography: {
            fontFamily: lang === 'en' ? 'main' : 'arabic',
        },
    });

    const direction = lang === 'en' ? 'ltr' : 'rtl';

    function handleLanguageClick() {
        if (lang === 'en') {
            setLang('ar');
            i18n.changeLanguage("ar");
            moment.locale("ar");
        } else {
            setLang('en');
            i18n.changeLanguage("en");
            moment.locale("en");
        }
        const timeAndDate = moment().format('LL');
        setDate(timeAndDate);
    }

    useEffect(() => {
        i18n.changeLanguage(lang);
        const timeAndDate = moment().format('LL');
        setDate(timeAndDate);

        const fetchWeather = async (latitude, longitude) => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7c6cb4cb679831a71f942ac8ebd1d48f`
                );
                const data = response.data;
                setTemp({
                    num: Math.round(data.main.temp - 273.15),
                    description: data.weather[0].description,
                    high: Math.round(data.main.temp_max - 273.15),
                    low: Math.round(data.main.temp_min - 273.15),
                    feel: Math.round(data.main.feels_like - 273.15),
                    icon: data.weather[0].icon,
                });
                setLocation((prev) => ({ ...prev, city: data.name }));
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setLocation((prev) => ({ ...prev, latitude, longitude }));
                    fetchWeather(latitude, longitude);
                },
                (error) => {
                    console.error("Error fetching location:", error.message);
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <>
                <div style={{ width: "100%", color: "white", position: "relative", margin: "0 20px" }}>
                    <Container disableGutters maxWidth="sm" sx={{}}>
                        {/* start the div card */}
                        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", }}>
                            {/* start heading */}
                            <div dir={direction} style={{ display: "flex", justifyContent: "space-between", alignItems: "end", backgroundColor: "", padding: "10px 20px" }}>
                                <div>
                                    <Typography variant="h2" sx={{ fontSize: { xs: "30px", md: "60px" } }}>
                                        {t(location.city)}
                                    </Typography>
                                </div>
                                <div >
                                    <Typography variant="h6" sx={{ fontSize: "16px" }}>
                                        {t(date)}
                                    </Typography>
                                </div>
                            </div>
                            {/* end heading */}

                            <hr />

                            { /* start the content of the card */}
                            <div dir={direction} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                <div className='details' style={{
                                    display: "flex", justifyContent: "center", alignItems: "start", gap: "",
                                    padding: direction === 'ltr' ? "20px 0 20px 20px" : "20px 20px 20px 0"
                                }}>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0px", }}>
                                            <div dir="ltr">
                                                <Typography variant="h2" sx={{ fontSize: { xs: "56px", md: "70px" }, display: "flex", alignSelf: "center" }}>
                                                    {temp.num}<span style={{ fontSize: "20px", }}>°</span>
                                                </Typography>
                                            </div>
                                            <div>
                                                {temp.icon && <img src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`} alt="weather icon" />}
                                            </div>
                                        </div>
                                        <div>
                                            <Typography variant="h6" sx={{ fontSize: "18px", marginTop: "0px" }}>
                                                {t(temp.description)}
                                            </Typography>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                                            <Typography variant="h6" sx={{ fontSize: "16px" }}>
                                                {t("High")} : {temp.high}
                                            </Typography>
                                            <div> | </div>
                                            <div>
                                                <Typography variant="h6" sx={{ fontSize: "16px" }} >
                                                    {t("Low")} : {temp.low}
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography variant="h6" sx={{ fontSize: "16px", marginTop: "10px" }}>
                                            {t("Feels like")} : {temp.feel}
                                        </Typography>
                                    </div>
                                </div>

                                <div>
                                    {/* static image from mui */}
                                    <img className='cloud-img' src="/images/cloud.png" alt="cloudy" style={{ maxWidth: "340px" }} />
                                </div>
                            </div>
                            {/* end the content of the card */}
                        </div>

                        <div dir={direction} style={{ display: "flex", justifyContent: "end", marginTop: "10px" }} >
                            <Button
                                variant="text"
                                color=''
                                onClick={handleLanguageClick} >
                                {lang === 'en' ? 'عربي' : 'English'}
                            </Button>
                        </div>
                        {/* end the div card */}
                    </Container >
                </div >
            </>
        </ThemeProvider>
    )
}