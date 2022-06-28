import { Button } from '@mantine/core';
import { useAtom } from 'jotai';
import useFirebase from '../../../providers/useFirebase';
import useOwnChannels from '../../../services/firebase/channels/useOwnChannels';
import { authUserToProfile } from '../../../shared/Utils';
import { selectedChannelAtom } from '../ChannelStack/ChannelStack';

export default function ChannelOptions() {
  const [selectedChannel, setSelectedChannel] = useAtom(selectedChannelAtom);
  const { user } = useFirebase();
  const { kickUserFromChannel } = useOwnChannels();

  const handleLeaveChannel = async () => {
    setSelectedChannel(null);
    await kickUserFromChannel(authUserToProfile(user!), selectedChannel?.id!);
  };

  if (selectedChannel?.admin.uid === user?.uid) {
    return null; // only display for non admin users
  }

  return (
    <Button fullWidth color="orange" onClick={() => handleLeaveChannel()}>
      Leave channel
    </Button>
  );
}