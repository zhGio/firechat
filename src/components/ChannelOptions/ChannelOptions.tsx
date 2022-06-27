import { Button } from '@mantine/core';
import { useAtom } from 'jotai';
import useFirebase from '../../providers/useFirebase';
import useOwnChannels from '../../services/firebase/useOwnChannels';
import { authUserToProfile } from '../../shared/Utils';
import { selectedChannelAtom } from '../ChannelStack/ChannelStack';

export default function ChannelOptions() {
  const [selectedChannel, setSelectedChannel] = useAtom(selectedChannelAtom);
  const { user } = useFirebase();
  const { kickUserFromChannel } = useOwnChannels();

  const handleLeaveChannel = async () => {
    await kickUserFromChannel(authUserToProfile(user!), selectedChannel?.id!);
    setSelectedChannel(null);
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
