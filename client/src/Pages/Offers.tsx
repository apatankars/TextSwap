import "../Styles/App.css";
import "../Styles/Offers.css";
import { CircularProgress } from "@mui/material";

import { useEffect, useState } from "react";
import { NavMenu } from "../Components/NavMenu/NavMenu";
import { OfferResponseCard } from "../Components/Cards/OfferResponseCard";
import { BuyCard } from "../Components/Cards/BuyCard";
import Stack from "@mui/material/Stack";
import { DashboardMenu } from "../Components/Offers/DashboardMenu";
import { Offer, OfferStatus, User } from "../Types/types";
import { FiAlertTriangle } from "react-icons/fi";
import { Typography } from "@mui/joy";
import { getIncomingOffers, getOutgoingOffers } from "../utils/api";
import Footer from "../Components/Footer/Footer";

interface OfferProps {
  user: User | null;
}

/**
 * Offers Component
 *
 * This component displays incoming and outgoing offers based on the current mode (buying/selling)
 * and the active tab (active/history). It filters and sorts offers accordingly.
 */
export function Offers(props: OfferProps) {
  const { user } = props;

  const [isBuyingMode, setIsBuyingMode] = useState(true);
  const [isActiveMode, setIsActiveMode] = useState(true);
  const [outgoingOffers, setOutgoingOffers] = useState<Offer[]>([]);
  const [incomingOffers, setIncomingOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buyingActiveCount, setBuyingActiveCount] = useState(0);
  const [sellingActiveCount, setSellingActiveCount] = useState(0);

  /**
   * Fetch outgoing offers for the user.
   */
  async function getOutgoing() {
    if (user) {
      return await getOutgoingOffers(user);
    }
    return [];
  }

  /**
   * Fetch incoming offers for the user.
   */
  async function getIncoming() {
    if (user) {
      return await getIncomingOffers(user);
    }
    return [];
  }

  /**
   * Fetch offers when the component mounts or when the user changes.
   */
  useEffect(() => {
    async function fetchOffers() {
      setIsLoading(true);
      const [outgoing, incoming] = await Promise.all([
        getOutgoing(),
        getIncoming(),
      ]);
      setOutgoingOffers(outgoing);
      setIncomingOffers(incoming);

      // Compute counts of active offers
      const buyingActive = outgoing.filter(
        (offer) =>
          offer.status === OfferStatus.Accepted ||
          offer.status === OfferStatus.Pending
      ).length;
      const sellingActive = incoming.filter(
        (offer) =>
          offer.status === OfferStatus.Accepted ||
          offer.status === OfferStatus.Pending
      ).length;
      setBuyingActiveCount(buyingActive);
      setSellingActiveCount(sellingActive);

      setIsLoading(false);
    }
    fetchOffers();
  }, [user?.userID]);

  /**
   * Sort offers based on their status.
   * For active offers: Accepted first, then Pending.
   * For history offers: Rejected first, then Expired.
   *
   * @param offers - Array of offers to sort
   * @param isActive - Boolean indicating if sorting for active tab
   * @returns Sorted array of offers
   */
  function sortOffers(offers: Offer[], isActive: boolean): Offer[] {
    return offers.sort((a, b) => {
      if (isActive) {
        // For active tab: Accepted (1) before Pending (2)
        return (
          (a.status === OfferStatus.Accepted ? 1 : 2) -
          (b.status === OfferStatus.Accepted ? 1 : 2)
        );
      } else {
        // For history tab: Rejected (1) before Expired (2)
        return (
          (a.status === OfferStatus.Rejected ? 1 : 2) -
          (b.status === OfferStatus.Rejected ? 1 : 2)
        );
      }
    });
  }

  /**
   * Get filtered and sorted offers based on the current mode and tab.
   *
   * @param isBuying - Boolean indicating if in buying mode
   * @param isActive - Boolean indicating if active tab is selected
   * @returns Array of filtered and sorted offers
   */
  function getCards(isBuying: boolean, isActive: boolean): Offer[] {
    let offers: Offer[] = [];

    if (isBuying) {
      if (isActive) {
        console.log("buying active", outgoingOffers);
        // Buying Mode & Active Tab: Accepted and Pending outgoing offers
        offers = outgoingOffers.filter(
          (offer) =>
            offer.status === OfferStatus.Accepted ||
            offer.status === OfferStatus.Pending
        );
      } else {
        // Buying Mode & History Tab: Expired and Rejected outgoing offers
        offers = outgoingOffers.filter(
          (offer) =>
            offer.status === OfferStatus.Expired ||
            offer.status === OfferStatus.Rejected ||
            offer.status === OfferStatus.Cancelled
        );
      }
    } else {
      if (isActive) {
        // Selling Mode & Active Tab: Accepted and Pending incoming offers

        offers = incomingOffers.filter(
          (offer) =>
            offer.status === OfferStatus.Accepted ||
            offer.status === OfferStatus.Pending
        );
      } else {
        // Selling Mode & History Tab: Expired and Rejected incoming offers
        offers = incomingOffers.filter(
          (offer) =>
            offer.status === OfferStatus.Expired ||
            offer.status === OfferStatus.Rejected
        );
      }
    }

    // Sort the filtered offers
    return sortOffers(offers, isActive);
  }

  if (!user) {
    return (
      <div className="offer-page-container">
        <NavMenu />
        <p>Please sign in to view your offers.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="offer-page-container">
      <NavMenu />
      <DashboardMenu
        isBuyingMode={isBuyingMode}
        setIsBuyingMode={setIsBuyingMode}
        isActiveMode={isActiveMode}
        setIsActiveMode={setIsActiveMode}
        user={props.user}
        buyingActiveCount={buyingActiveCount}
        sellingActiveCount={sellingActiveCount}
      />
      {isLoading ? (
        <div style={{ marginTop: "32px" }}>
          <CircularProgress />
        </div>
      ) : getCards(isBuyingMode, isActiveMode).length > 0 ? (
        <div className="cards-container">
          {isBuyingMode ? (
            <Stack direction="column" spacing={2} width="95%">
              {getCards(isBuyingMode, isActiveMode).map((offer, index) => (
                <BuyCard
                  key={offer.offerID} // Assuming each offer has a unique 'id'
                  offer={offer}
                  outGoingOffers={outgoingOffers}
                  setOutGoingOffers={setOutgoingOffers}
                />
              ))}
            </Stack>
          ) : (
            <Stack direction="column" spacing={2} width="95%">
              {getCards(isBuyingMode, isActiveMode).map((offer, index) => (
                <OfferResponseCard
                  key={offer.offerID} // Assuming each offer has a unique 'id'
                  offer={offer}
                  incomingOffers={incomingOffers}
                  setIncomingOffers={setIncomingOffers}
                />
              ))}
            </Stack>
          )}
        </div>
      ) : (
        <div
          style={{
            width: "fit-content",
            borderRadius: "16px",
            marginTop: "32px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <FiAlertTriangle style={{ fontSize: "32px", color: "#C41D00" }} />
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: 600,
              marginLeft: "8px",
              color: "#C41D00",
              fontFamily: "DM Sans",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textAlign: "center",
            }}
          >
            No Offers Found
          </Typography>
        </div>
      )}
      <Footer />
    </div>
  );
}
