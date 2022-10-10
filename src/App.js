import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listGifts } from "./graphql/queries";
import {
  createGift as createGiftMutation,
  deleteGift as deleteGiftMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetchGifts();
  }, []);

  async function fetchGifts() {
    const apiData = await API.graphql({ query: listGifts });
    const giftsFromAPI = apiData.data.listGifts.items;
    setGifts(giftsFromAPI);
  }

  async function createGift(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await API.graphql({
      query: createGiftMutation,
      variables: { input: data },
    });
    fetchGifts();
    event.target.reset();
  }

  async function deleteGift({ id }) {
    const newGifts = gifts.filter((gift) => gift.id !== id);
    setGifts(newGifts);
    await API.graphql({
      query: deleteGiftMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Gifts App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createGift}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Gift Name"
            label="Gift Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Gift Description"
            label="Gift Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Gift
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Gifts</Heading>
      <View margin="3rem 0">
        {gifts.map((gift) => (
          <Flex
            key={gift.id || gift.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {gift.name}
            </Text>
            <Text as="span">{gift.description}</Text>
            <Button variation="link" onClick={() => deleteGift(gift)}>
              Delete gift
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
