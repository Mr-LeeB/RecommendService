import { CommunityClass } from '../models/community.model';

class CommunityService {
  static async getAllCommunities(user_id: string) {
    const allCommunities = await CommunityClass.getAllCommunities();
    const communitiesByUser = await CommunityClass.getCommunitiesByUserID(user_id);

    const filterCommunities = allCommunities.filter((community) => {
      return !communitiesByUser.some((userCommunity) => userCommunity._id.toString() === community._id.toString());
    });

    return filterCommunities;
  }
}
export default CommunityService;
