using AutoMapper;
using Common.Entities;
using Database.Entities.Base;
using Database.Entities.Identity;

namespace BusinessLogic.Mapper;

public class TrackerMappingProfile : Profile {
    public TrackerMappingProfile() {
        CreateMap<ApplicationUser, AccountInfo>().ReverseMap();

        CreateMap<ApplicationUser, Dropdown>().ForMember("Name", act => act.MapFrom(u=> u.FullName));
    }
}