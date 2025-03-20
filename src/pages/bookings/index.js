import BookingCard from "@/components/booking/booking-card";
import Layout from "@/components/layout";
import NavBar from "@/components/navbar/navBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { deleteBooking, listBookings } from "@/data/booking";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.auth_token;

    const response = await fetch(
      "https://hammerhead-app-qgvud.ondigitalocean.app/bookings",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const bookings = await response.json();

    if (bookings && bookings.length > 0) {
      bookings.sort(
        (a, b) =>
          new Date(a.tickets[0].flight.departureDay) -
          new Date(b.tickets[0].flight.departureDay)
      );
    }

    return {
      props: {
        initialBookings: bookings || [],
      },
    };
  } catch (error) {
    console.log("Error fetching bookings", error);
    return {
      props: {
        initialBookings: [],
      },
    };
  }
}

export default function Bookings({ initialBookings }) {
  const router = useRouter();
  const [bookings, setBookings] = useState(initialBookings);

  const handleDelete = async (id) => {
    const cancel = window.confirm(
      "Are you sure you would like to delete this flight?"
    );
    if (cancel) {
      const bookingObj = {
        booking_id: id,
      };
      try {
        deleteBooking(bookingObj);
        await getSetBookings();
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const getSetBookings = async () => {
    try {
      const res = await listBookings();
      res.sort(
        (a, b) =>
          new Date(a.tickets[0].flight.departureDay) -
          new Date(b.tickets[0].flight.departureDay)
      );
      setBookings(res);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  useEffect(() => {
    getSetBookings();
  }, [router.asPath]);

  return (
    <>
      <Grid
        container
        rowSpacing={4}
        sx={{
          mt: 1,
          justifyContent: "center",
        }}
      >
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => {
            const destination = booking?.tickets?.length
              ? booking.tickets.length - 1
              : 0;
            return (
              <BookingCard
                key={booking.id}
                booking={booking}
                handleDelete={handleDelete}
                destination={destination}
              />
            );
          })
        ) : (
          <>
            <Box
              sx={{
                backgroundColor: "rgb(203, 199, 199)",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                padding: 4,
              }}
            >
              <Typography variant="h4">
                You currently have no flights booked.
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/");
                }}
                sx={{
                  marginLeft: 6,
                  boxShadow: 3,
                  backgroundColor: "#F3B12C",
                  color: "white",
                  ":hover": {
                    backgroundColor: "#A1A1A1",
                    color: "white",
                  },
                }}
              >
                Book Now!
              </Button>
            </Box>
          </>
        )}
      </Grid>
    </>
  );
}

Bookings.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NavBar />
      {page}
    </Layout>
  );
};
