using AutoMapper;
using Common.Entities;
using Database.Entities.Identity;

namespace BusinessLogic.Mapper;

public class TrackerMappingProfile : Profile {
    public TrackerMappingProfile() {
        CreateMap<ApplicationUser, AccountInfo>().ReverseMap();
    }
}